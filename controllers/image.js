const handleImage = (req, res, db) => {
    const { id } = req.body;
    console.log("ID Received:", id); // Log the ID received
  
    db('users')
      .where('id', '=', id) // Match the user by ID
      .increment('entries', 1) // Increment the entries by 1
      .returning('entries') // Return the updated value of entries
      .then(entries => {
        console.log("Returned entries:", entries); // Log the returned entries
  
        if (entries.length > 0) {
          // Convert the entries string to an integer (number)
          const updatedEntries = parseInt(entries[0].entries, 10); // Ensure it's a number
          console.log("Updated Entries:", updatedEntries); // Log the updated value
          res.json({ entries: updatedEntries }); // Send the updated entries as a response
        } else {
          console.log("No user found with this ID");
          res.status(404).json("User not found"); // Handle case when user ID is not found
        }
      })
      .catch(err => {
        console.error("Error Incrementing Entries:", err);
        res.status(400).json("Unable to get entries"); // Handle any errors
      });
  }

  module.exports = {
    handleImage:handleImage
  }