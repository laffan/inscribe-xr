import { useState } from "react";
import Layout from "./../components/desktop/shared/Layout";
import Reflections from "./../components/desktop/sections/Reflections/Reflections";
import Prompts from "./../components/desktop/sections/Prompts/Prompts";
import Environments from "./../components/desktop/sections/Environments/Environments";
import SectionNav from "./../components/desktop/shared/SectionNav";

const Dashboard = ({ section }) => {
  console.log(section);
  const [currentSection, setCurrentSection] = useState(section);

  const handleSectionSelect = (section) => {
    setCurrentSection(section);
    // update url to match
    window.history.pushState({ section }, section, section);
  };

  return (
    <Layout pageName={`Dashboard`}>
      <SectionNav
        currentSection={currentSection}
        sections={[  "prompts", "reflections" ]}
        handleSectionSelect={handleSectionSelect}
      />
      {currentSection === "reflections" && <Reflections />}
      {currentSection === "prompts" && <Prompts />}
      {currentSection === "environments" && <Environments />}
    </Layout>
  );
};

export default Dashboard;
