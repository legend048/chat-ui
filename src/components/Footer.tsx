export function Footer() {
  return (
    <footer className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center border-t border-gray-800 pt-8">
        <p className="text-gray-500">© 2024 Name_not_decided. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}