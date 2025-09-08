export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        m-web-next-app
      </h1>
      
      <a 
        href="/test"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white no-underline rounded-lg text-base font-medium transition-colors duration-200 hover:bg-blue-700"
      >
        查看功能演示
      </a>
      
      {/* 这里可以添加更多内容 */}
    </main>
  )
}