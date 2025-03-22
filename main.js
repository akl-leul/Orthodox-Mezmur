const sections = ["a1", "a2", "a3"];
const buttons = ["btn1", "btn2", "btn3"];

function toggleSection(id) {
  sections.forEach((section) => {
    document.getElementById(section).style.display = section === id ? "flex" : "none";
  });

  buttons.forEach((button) => {
    const isHighlighted = button === `btn${id.slice(1)}`;
    document.getElementById(button).style.backgroundColor = isHighlighted ? '#660066' : 'transparent';
    document.getElementById(button).style.color = isHighlighted ? 'white' : 'black';
  });
};
 