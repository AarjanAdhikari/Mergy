const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const target = `const handleCreatePR = async (fileName?: string) => {`;
const replacement = `const [showPRModal, setShowPRModal] = useState(false);
  const handleSubmitPR = () => {
    setShowPRModal(true);
  };
  const handleCreatePR = async (fileName?: string) => {`;

if (code.includes(target) && !code.includes('handleSubmitPR = ()')) {
  code = code.replace(target, replacement);
  fs.writeFileSync('app/page.tsx', code);
  console.log("Success: Added handleSubmitPR");
} else {
  console.log("Error: Target not found or already added");
}
