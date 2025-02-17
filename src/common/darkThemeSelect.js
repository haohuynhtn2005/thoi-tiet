const darkThemeSelect = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#2b3035', // Dark background for the input box
    borderColor: state.isFocused ? '#2196F3' : '#555', // Blue border when focused
    color: 'white', // Text color inside the input
    boxShadow: state.isFocused ? '0 0 0 1px #2196F3' : 'none', // Blue box shadow for focus state
    '&:hover': {
      borderColor: '#2196F3', // Blue border when hovered
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#2196F3' // Blue background for selected options
      : state.isFocused
      ? '#444' // Darker background when focused
      : '#222', // Default dark background
    color: state.isSelected ? 'white' : 'lightgray', // Light text for unselected options
    '&:active': {
      backgroundColor: '#2196F3', // Blue background when option is clicked
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#2b3035', // Dark background for the dropdown menu
    borderRadius: '8px', // Rounded corners for the dropdown
    color: 'white', // Text color inside the dropdown
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#2196F3', // Blue background for selected items in multi-select
    color: 'white', // Text color of selected items
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white', // Label color for selected items
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'white', // Remove icon color
    '&:hover': {
      backgroundColor: '#ff0000', // Red background when hovering over remove icon
      color: 'white',
    },
  }),
  input: (base) => ({
    ...base,
    color: 'white', // Text color for the input field
  }),
  placeholder: (base) => ({
    ...base,
    color: 'lightgray', // Light placeholder text
  }),
};

export default darkThemeSelect;
