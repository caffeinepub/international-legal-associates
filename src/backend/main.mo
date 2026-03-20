import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  type Message = {
    content : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextId = 0;
  let messages = Map.empty<Nat, Message>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Chat Message Functions
  public shared ({ caller }) func sendMessage(message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send messages");
    };

    messages.add(
      nextId,
      {
        content = message;
        timestamp = Time.now();
      },
    );
    nextId += 1;
  };

  public query ({ caller }) func getMessages(count : Nat) : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };

    let messagesArray = messages.values().toArray();
    let totalMessages = messagesArray.size();

    if (totalMessages == 0) {
      return [];
    };

    let startIndex = if (totalMessages > count) {
      totalMessages - count;
    } else {
      0;
    };

    Array.tabulate<Message>(
      totalMessages - startIndex,
      func(i : Nat) : Message {
        messagesArray[startIndex + i];
      }
    );
  };

  public query ({ caller }) func getMessage(id : Nat) : async ?Message {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };
    messages.get(id);
  };

  public query ({ caller }) func getMessageCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };
    messages.size();
  };

  public shared ({ caller }) func calculateFunctionAccuracy(functionId : Nat) : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can calculate function accuracy");
    };
    if (functionId == 0) {
      Runtime.trap("A calculation attempt was made for a function without a connected backend. This might indicate a bug in the code. If you think this is an error, please try again or contact support.");
    };
    1.0;
  };

  // Public utility functions (no auth required)
  public query ({ caller }) func helloWorld() : async Text {
    "Hello world";
  };

  public query ({ caller }) func add(x : Int, y : Int) : async Int {
    x + y;
  };
};

