function ValidationMessage({ text, selectedPlatforms }) {

  const limits = {
    LinkedIn:3000,
    Instagram:2200,
    X:280,
    Facebook:63206
  };
    if (selectedPlatforms.length === 0) {
    return (
      <p style={{ color: "red" }}>
        ⚠ Please select at least one platform.
      </p>
    );
  }
  return (
    <div>

      {selectedPlatforms.map(platform=>{

        const remaining=limits[platform]-text.length;

        if(remaining<0){

          return(
            <p
            key={platform}
            style={{color:"red"}}
            >

            ❌ {platform}: Character limit exceeded !

            </p>
          );
        }

        if(remaining<50){

          return(
            <p
            key={platform}
            style={{color:"orange"}}
            >

            ⚠ {platform}: Only {remaining} characters remaining.

            </p>
          );
        }

        return(
          <p
          key={platform}
          style={{color:"green"}}
          >

          ✔ {platform} Ready to publish.

          </p>
        );

      })}

    </div>
  );
}

export default ValidationMessage;