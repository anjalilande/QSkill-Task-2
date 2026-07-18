import { useState, useCallback, useEffect } from "react";

function App() {

const [length, setLength] = useState(12);
const [randomString, setRandomString] = useState("");
const [copied, setCopied] = useState(false);
const [includeSymbols, setIncludeSymbols] = useState(false);

const generateString = useCallback(() => {
  
  if (length < 1 || length > 100) return;

 let characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

if (includeSymbols) {
  characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
}

  let result = "";

  for (let i = 0; i < Number(length); i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  setRandomString(result);
  setCopied(false);

}, [length,includeSymbols]);

useEffect(() => {
  generateString();
}, [generateString]);

const copyString = () => {
   navigator.clipboard.writeText(randomString);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-800 
    flex items-center justify-center px-4">

      <div className="w-full max-w-md 
      bg-zinc-900/80 backdrop-blur-lg 
      border border-zinc-700 
      rounded-3xl 
      p-8 
      shadow-2xl">

        <div className="text-center mb-8">

         
          <h1 className="text-3xl font-bold text-white">
            Random String Generator
           
          </h1>

          

        </div>


        <label className="text-sm text-zinc-400">
          String Length(1-50)
        </label>

        <input
         type="number"
         min="1"
         max="50"
         value={length}
         onChange={(e) => {
         const value = Math.min(50, Math.max(1, Number(e.target.value)));
         setLength(value);
         }}
         placeholder="Enter length (e.g. 10)"
          className="mt-2 w-full 
          bg-black/40 
          text-white 
        border border-zinc-700 
        rounded-xl 
        px-4 py-3 
        placeholder-zinc-600
        focus:outline-none 
        focus:border-zinc-400"
          
        />
        
       <div className="mt-4 flex items-center gap-3">
  <input
    type="checkbox"
    id="symbols"
    checked={includeSymbols}
    onChange={(e) => setIncludeSymbols(e.target.checked)}
    className="w-4 h-4 accent-white cursor-pointer"
  />

  <label
    htmlFor="symbols"
    className="text-sm text-zinc-300 cursor-pointer select-none"
  >
    Include Symbols
  </label>
</div>

        <button
             onClick={generateString}
             className="mt-5 w-full 
             bg-white 
             text-black 
             font-semibold 
             py-2.5
             text-sm
             rounded-xl 
             hover:bg-zinc-200 
             transition-all 
            duration-300"
        >
          Generate String
        </button>


        <div className="mt-6 
         bg-black/40 
         border border-zinc-700 
         rounded-xl 
         p-5">

         <div className="flex justify-between items-center mb-3">

         <p className="text-xs text-zinc-500">
            GENERATED STRING
         </p>
         

    <button
  onClick={copyString}
  className="flex items-center gap-2
  text-xs 
  bg-zinc-800 
  text-zinc-200 
  border border-zinc-700
  px-3 py-1.5
  rounded-lg 
  hover:bg-zinc-700
  hover:border-zinc-500
  transition-all"   
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>

  </div>
        
         <p className="text-zinc-300 break-all">
              {randomString}
         </p>
         
             
             
  </div>
      </div>

    </div>
  )
}

export default App