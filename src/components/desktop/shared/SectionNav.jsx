const SectionNav = ({ sections, currentSection, handleSectionSelect }) => {
  return (
    <nav className="SectionNav">
      <a className="SectionNav__VRLink" href="/vr">
        <span className="SectionNav__VRLinkArrow">
        </span>
        <span className="SectionNav__VRLinkMask"></span>
        <span className="SectionNav__VRLinkImg"></span>
      </a>

      <ul>
        {sections.map((section, i) => (
          <li
            key={`nav${i}`}
            className={
              currentSection === section ? "SectionNav__ActiveSection" : null
            }
          >
            <button
              onClick={() => {
                handleSectionSelect(section);
              }}
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNav;
