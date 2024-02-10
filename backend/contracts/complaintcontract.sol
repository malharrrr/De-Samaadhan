// SPDX-License-Identifier: MIT
pragma
solidity
^0.8.8;


contract
complaintcontract {


   
// Variables
   
uint256
public nextId;
   
uint256
public userId;
   
uint256
public officerId;
   
uint256
[]
public pendingApprovals;
   
uint256
[]
public pendingResolutions;
   
uint256
[]
public resolvedCases;
   
uint256
[]
public spamCases;


   
struct complaint
{
       
uint256 id;
       
uint256 userId;
       
string approvalRemark;
       
string resolutionRemark;
       
bool isApproved;
       
bool isResolved;
       
bool isSpam;
       
bool exists;
   
}


   
mapping(uint256
=> complaint)
public Complaints;
   
mapping(uint256
=> uint256[])
public userComplaints;


   
event complaintFiled(
       
uint256 id,
       
uint256 userId


   
);


   
modifier onlyOfficer()
{
       
require(officerId
== officerId,
"You are not the authorized officer");
        _;
   
}


   
constructor(uint256
_officerId,
uint256 _userId)
{
        officerId
= _officerId;
        userId
= _userId;
        nextId
=
1;


   
}


   
function fileComplain(uint256
_userId)
public{
        complaint
storage newComplaint
= Complaints[nextId];
        newComplaint.id
= nextId;
        newComplaint.userId
= _userId;
        newComplaint.approvalRemark
=
"Approval is Pending!";
        newComplaint.resolutionRemark
=
"Resolution is Pending!";
        newComplaint.isSpam
=
false;
        newComplaint.isApproved
=
false;
        newComplaint.isResolved
=
false;
        newComplaint.exists
=
true;
        userComplaints[_userId].push(nextId);
       
emit complaintFiled(nextId,
_userId);
        nextId++;
   
}


   
function getComplaintsByUser(uint256
_userId)
public
view
returns
(uint256[]
memory)
{
       
return userComplaints[_userId];
   
}


   
function getAllComplaints()
public
view onlyOfficer
returns
(complaint[]
memory)
{
        complaint[]
memory allComplaints
=
new complaint[](nextId
-
1);


       
for
(uint256
i =
1;
i < nextId;
i++)
{
           
if
(Complaints[i].exists)
{
                allComplaints[i
-
1]
= Complaints[i];
           
}
       
}


       
return allComplaints;
   
}




   
function approveComplaint(uint256
_id,
string
memory _approvalRemark)
public onlyOfficer
{
       
require(Complaints[_id].exists
==
true,
"Complaint ID not found!");
       
require(Complaints[_id].isApproved
==
false,
"Complaint is already approved!");
       
require(Complaints[_id].isSpam
==
false,
"Complaint has been flagged Spam!");


        Complaints[_id].isApproved
=
true;
        Complaints[_id].approvalRemark
= _approvalRemark;
   
}


   
function declineComplaint(uint256
_id,
string
memory _approvalRemark)
public onlyOfficer
{
       
require(Complaints[_id].exists
==
true,
"Complaint ID not found!");
       
require(Complaints[_id].isApproved
==
false,
"Complaint is already approved!");
       
require(Complaints[_id].isSpam
==
false,
"Complaint is flagged Spam!");


        Complaints[_id].exists
=
false;
        Complaints[_id].approvalRemark
=
string.concat("This
complaint is rejected. Reason: ",
_approvalRemark);
   
}
   
   
function spamComplaint(uint256
_id)
public onlyOfficer
{
       
require(Complaints[_id].exists
==
true,
"Complaint ID not found!");
       
require(Complaints[_id].isApproved
==
false,
"Complaint is already approved!");
       
require(Complaints[_id].isSpam
==
false,
"Complaint is already flagged Spam!");


        Complaints[_id].isSpam
=
true;
        Complaints[_id].approvalRemark
=
"Your Complaint is flagged Spam. Please refrain from raising invalid complaints. If three complaints are flagged, your account will be banned.";
   
}


   
function resolveComplaint(uint256
_id,
string
memory _resolutionRemark)
public onlyOfficer{
       
require(Complaints[_id].exists
==
true,
"Complaint ID not found!");
       
require(Complaints[_id].isApproved
==
true,
"Complaint is not yet approved!");
       
require(Complaints[_id].isResolved
==
false,
"Complaint is already resolved!");
       
require(Complaints[_id].isSpam
==
false,
"Complaint is flagged Spam!");


        Complaints[_id].isResolved
=
true;
        Complaints[_id].resolutionRemark
= _resolutionRemark;
   
}


   
function calcPendingApprovalIds()
public
{
       
delete pendingApprovals;
       
for
(uint256
i =
1;
i < nextId;
i++)
{
           
if
(
                Complaints[i].isApproved
==
false
&&
                Complaints[i].exists
==
true
           
)
{
                pendingApprovals.push(Complaints[i].id);
           
}
       
}
   
}


   
function calcPendingResolutionIds()
public
{
       
delete pendingResolutions;
       
for
(uint256
i =
1;
i < nextId;
i++)
{
           
if
(
                Complaints[i].isResolved
==
false
&&
                Complaints[i].isApproved
==
true
&&
                Complaints[i].exists
==
true
           
)
{
                pendingResolutions.push(Complaints[i].id);
           
}
       
}
   
}


   
function calcResolvedIds()
public
{
       
delete resolvedCases;
       
for
(uint256
i =
1;
i < nextId;
i++)
{
           
if
(Complaints[i].isResolved
==
true)
{
                resolvedCases.push(Complaints[i].id);
           
}
       
}
   
}


   
function calcSpamIds()
public
{
       
delete spamCases;
       
for
(uint256
i =
1;
i < nextId;
i++)
{
           
if
(Complaints[i].isSpam
==
true)
{
                spamCases.push(Complaints[i].id);
           
}
       
}
   
}


   
function setUserId(uint256
_userId)
public
{
        userId
= _userId;
   
}


   
function setOfficerId(uint256
_officerId)
public
{
        officerId
= _officerId;
   
}
}