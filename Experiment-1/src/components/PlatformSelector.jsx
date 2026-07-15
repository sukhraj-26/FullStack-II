function PlatformSelector({ selectedPlatforms, setSelectedPlatforms }) {
  const platforms = [
    "LinkedIn",
    "Instagram",
    "X",
    "Facebook",
  ];

  const handleChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((p) => p !== platform)
      );
    } else {
      setSelectedPlatforms([
        ...selectedPlatforms,
        platform,
      ]);
    }
  };

  return (
    <div className="platform-selector">
      <h3>Select Platforms</h3>

      {platforms.map((platform) => (
        <label key={platform} className="platform-option">
          <input
            type="checkbox"
            checked={selectedPlatforms.includes(platform)}
            onChange={() => handleChange(platform)}
          />
          {platform}
        </label>
      ))}
    </div>
  );
}

export default PlatformSelector;