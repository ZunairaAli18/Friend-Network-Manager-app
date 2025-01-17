class Person {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  //this class will have the adjacency list of the vertex, and
  class Graph {
    // 2d array of objects of person class that will be the adjecency list:
    constructor() {
      const adjList = [];
      let friendCount = 0;
    }
  
    addFriend(new_friend, friendlist_of_new_friend) {
      if (new_friend instanceof Person) {
        if (adjList[0] && adjList[0].length === 0) {
          // no friend of the current user yet. the first index of the adj list will always hold the friends of the current user
          adjList[0] = []; // created the adj list
        }
        this.adjList[0][friendCount].push(new_friend); // added the new friend
        friendCount++;
  
        //adding friend of new friends to the adjacency list:
        adjList[friendCount] = []; //creating a new array to add infFriend
        if (friendlist_of_new_friend instanceof Graph.adjList) {
          adjList[friendCount] = friendlist_of_new_friend; // placing the entre array on that index
        }
      } else {
        console.error("unidentified information provided");
      }
    }
  
    SearhFriend(friend_to_search) {
      // Validate input
      if (!(friend_to_search instanceof Person)) {
        console.error(
          "Invalid input: friend_to_search is not an instance of Person"
        );
        return null;
      }
  
      // Check if adjList and adjList[0] exist
      if (
        !this.adjList ||
        !Array.isArray(this.adjList[0]) ||
        this.adjList[0].length === 0
      ) {
        console.log("No friends found in the adjacency list.");
        return null;
      }
      // friend of the user will be opresent in 1D array on 0th index of adj list:
  
      if (friend_to_search instanceof Person) {
        totalfriends = adjList[0].length;
        for (let i = 0; i < totalFriends; i++) {
          const currentFriend = this.adjList[0][i];
  
          // Compare properties to find a match
          if (
            currentFriend.username === friend_to_search.username &&
            currentFriend.password === friend_to_search.password
          ) {
            return currentFriend; // Friend found, return the object
          }
        }
        return null;
      }
    }
  
    RemoveFriend(friend_to_remove) {
      if (!(friend_to_remove instanceof Person)) {
        console.error(
          "Invalid input: friend_to_remove is not an instance of Person"
        );
        return;
      }
  
      // Check if adjList[0] exists and has objects
      if (!this.adjList[0] || this.adjList[0].length === 0) {
        console.log("No friends to remove.");
        return;
      }
      const index = this.adjList[0].findIndex(
        (person) =>
          person.username === friend_to_remove.username &&
          person.password === friend_to_remove.password
      );
      if (index === -1) {
        console.log("Friend not found in the list.");
      } else {
        // Remove the friend from the list
        this.adjList[0].splice(index, 1);
        console.log(`Friend ${friend_to_remove.username} removed.`);
      }
    }
  
    DisplayFriends() {
      if (!this.adjList[0] || this.adjList[0].length === 0) {
        console.log("No friends to Display.");
        return;
      }
      totalfriends = adjList[0].length;
      for (let i = 0; i < totalFriends; i++) {
        const currentFriend = this.adjList[0][i];
        console.log(`Friend ${i + 1}: Username - ${currentFriend.username}`);
      }
      return;
    }
    DisplayMutualFriends() {
      if (!this.adjList || this.adjList.length <= 1) {
        console.log("No mutual friends found.");
        return;
      }
      console.log("Mutual friends:");
  
      // Loop through indexes starting from 1
    for (let i = 1; i < this.adjList.length; i++) {
      const friend = this.adjList[0][i - 1]; // Friend at index (i - 1) in the 0th array
      const mutualFriends = this.adjList[i]; // Mutual friends at index i
  
      // Check if the friend exists and has mutual friends
      if (friend && Array.isArray(mutualFriends) && mutualFriends.length > 0) {
        console.log(`Friends of ${friend.username}:`);
        mutualFriends.forEach((mutualFriend, index) => {
          console.log(`  Mutual Friend ${index + 1}: Username - ${mutualFriend.username}`);
        });
      } else if (friend) {
        console.log(`${friend.username} has no mutual friends.`);
      } else {
        console.log(`No friend found at index ${i - 1} of the user's friend list.`);
      }
    }
  }
  
  }