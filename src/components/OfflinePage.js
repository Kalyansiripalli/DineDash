
const OfflinePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/737/785/non_2x/no-internet-connection-illustration-concept-free-vector.jpg"
          alt="No internet connection"
          className="mx-auto mb-4 w-64"
        />
        <p className="text-center text-lg font-semibold">
          No internet connection. Please check your network settings.
        </p>
      </div>
  )
}

export default OfflinePage