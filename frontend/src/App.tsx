// import React, { useState } from 'react'

// function App() {
//   const [title, setTitle] = useState("");
//   const handleSubmit = () => {}
//   return (
//     <div>
//             <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center py-6 px-20 bg-white shadow-lg rounded-lg">
//         <label className="text-2xl font-semibold text-black mb-4">Decks Title</label>
//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="title"
//             value={title}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
//             className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 w-80"
//             placeholder="Enter deck title"
//           />
//           <button
//             type="submit"
//             className="bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-600 transition duration-300"
//           >
//             Create Deck
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default App



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
			<Route path="/home" element={<Dashboard />} />
		</Routes>
	</BrowserRouter>
);

export default App