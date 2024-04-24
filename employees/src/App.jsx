// React
import { useState } from 'react';
// Styles
import './App.css';
// Utils
import { parseCSV } from './utils/csvUtils';
import {
  computeWorkingPairs,
  convertToProjectStructure,
  determineLongestWorkingPair,
} from './utils/projectPairsAnalysisUtils';
// Components
import FileUploadCard from './components/FileUploadCard';
import EmployeesPairTable from './components/EmployeesPairTable';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [longestWorkingPair, setPairWithLongestWorkTime] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const parsedFile = await parseCSV(file);
    const projects = convertToProjectStructure(parsedFile);
    const pairs = computeWorkingPairs(projects);
    const pairWorkingTogetherTheMost = determineLongestWorkingPair(pairs);
    setPairWithLongestWorkTime(pairWorkingTogetherTheMost);

    let msg = `File "${file.name}" is Uploaded!`;
    if (typeof pairWorkingTogetherTheMost == 'string') {
      msg = 'No pairs found!';
    }
    setToastMessage(msg);
    handleShowToast();
  };

  const handleTriggerInfo = () => {
    setToastMessage('File format should be only .csv!');
    handleShowToast();
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <main>
      <FileUploadCard
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleTriggerInfo={handleTriggerInfo}
        showToast={showToast}
        handleCloseToast={handleCloseToast}
        toastMessage={toastMessage}
      />
      {longestWorkingPair && <EmployeesPairTable pair={longestWorkingPair} />}
    </main>
  );
};

export default App;
