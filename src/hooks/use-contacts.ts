import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase, type ContactRow } from "@/lib/supabase"
import { PhonebookEntry } from "@/components/phonebook/columns"
import { toast } from "sonner"

// Transform database row to PhonebookEntry
const transformContact = (contact: ContactRow): PhonebookEntry => ({
    id: contact.id,
    name: contact.name,
    phoneNumber: contact.phone_number,
    email: contact.email || undefined,
    category: contact.category,
  })

interface UseContactsOptions {
  page: number
  pageSize: number
}

export function useContacts({ page, pageSize }: UseContactsOptions) {
  return useQuery({
    queryKey: ["contacts", page, pageSize],
    queryFn: async () => {
      const start = page * pageSize
      const end = start + pageSize - 1

      // First, get total count
      const { count } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true })

      // Then get paginated data
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("name", { ascending: true })
        .range(start, end)

      if (error) throw error

      return {
        data: data.map(transformContact),
        pageCount: Math.ceil((count || 0) / pageSize),
        total: count || 0
      }
    },
  })
}

export function useAddContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (contact: Omit<PhonebookEntry, "id">) => {
      const { data, error } = await supabase
        .from("contacts")
        .insert({
          name: contact.name,
          phone_number: contact.phoneNumber,
          email: contact.email || null,
          category: contact.category,
        })
        .select()
        .single()

      if (error) throw error
      return transformContact(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast.success("Contact added successfully")
    },
    onError: () => {
      toast.error("Failed to add contact")
    },
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast.success("Contact deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete contact")
    },
  })
} 