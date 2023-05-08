document
  .getElementById("generate-btn")
  .addEventListener("click", generatePassword);
document.getElementById("copy-btn").addEventListener("click", copy);
document
  .getElementById("download-btn")
  .addEventListener("click", copyPasswordToClipboard);

function generatePassword() {
  const passwordLength = document.getElementById("password-length").value;
  if (passwordLength > 0) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    const passwordInput = document.getElementById("password");
    passwordInput.value = password;
  }
}

function copy() {
  const passwordInput = document.getElementById("password");
  // Copy the password to clipboard
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function copyPasswordToClipboard() {
  const passwordInput = document.getElementById("password");
  const passwordTitle = document.getElementById("password-title").value;
    const password = passwordInput.value;
    const currentDate = new Date().toLocaleString();
    // Create and download the text file
    const textFileContent = `# Titre: ${passwordTitle}\n# Date de création:\t${currentDate}\n# Mot de passe:\t${password} \n\n *By OctoPassword`;
    const textFileBlob = new Blob([textFileContent], {
      type: "text/markdown;charset=utf-8",
    });
    const textFileURL = URL.createObjectURL(textFileBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = textFileURL;
    downloadLink.download = `${passwordTitle}_password.md`;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(textFileURL);
}
