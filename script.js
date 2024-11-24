document.getElementById('checkStrength').addEventListener('click', async () => {
  const password = document.getElementById('passwordInput').value;

  if (!password) {
    document.getElementById('strength').innerText = "Please enter a password!";
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      throw new Error('Error checking password strength');
    }

    const result = await response.json();
    document.getElementById('strength').innerText = `Password Strength: ${result.strength}`;
  } catch (error) {
    document.getElementById('strength').innerText = 'Error checking password strength';
  }
});
