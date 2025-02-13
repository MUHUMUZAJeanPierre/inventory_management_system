import React, { useEffect, useState } from "react";
// import { getBooks } from "../services/bookService";

const FeaturedBooks: React.FC = () => {
//   const [books, setBooks] = useState<any[]>([]);

//   useEffect(() => {
//     getBooks().then((data) => setBooks(data));
//   }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Books</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.slice(0, 4).map((book, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={book.coverImage} className="w-full h-64 object-cover" alt={book.title} />
              <div className="p-4">
                <h5 className="text-lg font-bold">{book.title}</h5>
                <p className="text-gray-600">{book.author}</p>
                <button className="mt-3 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedBooks;
