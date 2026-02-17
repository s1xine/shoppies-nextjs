const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-xl font-bold">Shoppies</h4>
        <p className="text-sm text-gray-400 mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
