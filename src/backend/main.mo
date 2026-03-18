import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  // Data type for an inquiry
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  // Inquiry module for comparison (by name)
  module Inquiry {
    public func compareByName(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Text.compare(inquiry1.name, inquiry2.name);
    };
  };

  var nextInquiryId = 0;
  let inquiries = Map.empty<Nat, Inquiry>();
  var isAdmin = true;

  // Submit a new inquiry
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let id = nextInquiryId;
    let inquiry : Inquiry = { id; name; email; phone; message };
    inquiries.add(id, inquiry);
    nextInquiryId += 1;
    id;
  };

  // Get all inquiries (admin only)
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not isAdmin) { Runtime.trap("Only admins can view inquiries.") };
    inquiries.values().toArray();
  };

  // Get all inquiries sorted by name (admin only)
  public query ({ caller }) func getAllInquiriesSortedByName() : async [Inquiry] {
    if (not isAdmin) { Runtime.trap("Only admins can view inquiries.") };
    inquiries.values().toArray().sort(Inquiry.compareByName);
  };

  // Clear all inquiries (admin only)
  public shared ({ caller }) func clearAllInquiries() : async () {
    if (not isAdmin) { Runtime.trap("Only admins can clear inquiries.") };
    inquiries.clear();
  };

  // Get a specific inquiry by id (admin only)
  public query ({ caller }) func getInquiryById(id : Nat) : async Inquiry {
    if (not isAdmin) { Runtime.trap("Only admins can view inquiries.") };
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };

  // Get the number of inquiries
  public query ({ caller }) func getInquiryCount() : async Nat {
    inquiries.size();
  };
};
