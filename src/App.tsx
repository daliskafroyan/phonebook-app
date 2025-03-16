import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { columns } from "@/components/phonebook/columns"
import { DataTable } from "@/components/phonebook/data-table"
import { useContacts, useAddContact } from "@/hooks/use-contacts"
import { Toaster } from "sonner"
import { useState } from "react"

const queryClient = new QueryClient()

function PhonebookContent() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  
  const { data, isLoading } = useContacts({
    page,
    pageSize,
  })
  const { mutate: addContact } = useAddContact()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Phonebook</h1>
        <DataTable 
          columns={columns} 
          data={data?.data || []} 
          pageCount={data?.pageCount || 0}
          currentPage={page}
          pageSize={pageSize}
          onPaginationChange={(newPage, newPageSize) => {
            setPage(newPage)
            setPageSize(newPageSize)
          }}
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
