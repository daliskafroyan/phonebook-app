import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { columns } from "@/components/phonebook/columns"
import { DataTable } from "@/components/phonebook/data-table"
import { useContacts, useAddContact } from "@/hooks/use-contacts"
import { Toaster } from "sonner"

const queryClient = new QueryClient()

function PhonebookContent() {
  const { data, isLoading } = useContacts()
  const { mutate: addContact } = useAddContact()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Phonebook</h1>
        <DataTable 
          columns={columns} 
          data={data || []} 
          onAddContact={addContact}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PhonebookContent />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
