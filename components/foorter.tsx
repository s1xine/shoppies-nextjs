import { currentYear } from "@/utils/currentYear";

const Footer = () => {
  const currYear = currentYear();
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-xl font-bold">Shoppies</h4>
        <p className="text-sm text-gray-400 mt-2">
          © {currYear} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
