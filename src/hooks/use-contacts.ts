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

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("name", { ascending: true })

      if (error) throw error
      return data.map(transformContact)
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