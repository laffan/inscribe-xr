import { useState } from "react";
import Layout from "./../components/desktop/shared/Layout";
import Reflections from "./../components/desktop/sections/Reflections/Reflections";
import Prompts from "./../components/desktop/sections/Prompts/Prompts";
import Welcome from "./../components/desktop/sections/Welcome/Welcome";
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
        sections={[ "welcome", "prompts", "reflections" ]}
        handleSectionSelect={handleSectionSelect}
      />
      {currentSection === "reflections" && <Reflections />}
      {currentSection === "prompts" && <Prompts />}
      {currentSection === "welcome" && <Welcome />}
    </Layout>
  );
};

export default Dashboard;
