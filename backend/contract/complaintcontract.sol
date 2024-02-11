// SPDX-License-Identifier: MIT
pragma
solidity
^0.8.0;


contract
 contract_new {
   //
 Mappings
   mapping(string
 => string)
public UserToHash;


   //
 Getter functions
   function
 getUserHash(string
memory user)
public
view
returns
(string
memory)
{
       return
 UserToHash[user];
   }


   //
 Setter functions
   function
 setUserHash(string
memory user,
string
memory hash)
public
{
       UserToHash[user]
= hash;
   }


}
// SPDX-License-Identifier: MIT
pragma
solidity
^0.8.0;


contract
 contract_new {
   //
 Mappings
   mapping(string
 => string)
public UserToHash;


   //
 Getter functions
   function
 getUserHash(string
memory user)
public
view
returns
(string
memory)
{
       return
 UserToHash[user];
   }


   //
 Setter functions
   function
 setUserHash(string
memory user,
string
memory hash)
public
{
       UserToHash[user]
= hash;
   }


}
