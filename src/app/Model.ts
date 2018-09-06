import { Injectable } from "@angular/core";
export class UserWorkspace {
  constructor(
    // public UserId: string,
    public userAccount: UserAccount,
    public workspace : Workspace,

  ) { }
}

export class UserAccount {
  constructor(
    // public UserId: string,
    public FirstName: string,
    public LastName: string,
    public EmailId: string,
    public Password: string,
    public isVerified: boolean,
    public Workspaces: WorkspaceName,
    public UserWorkspaces : UserWorkspace[],

  ) { }
}
export class Workspace {
  constructor(
    // public id : number,
    // public  Id: number,
    public WorkspaceName: string,
    public PictureUrl: string,
    public channels : Channel[],
    public Userstate: Userstate,
    public UserWorkspaces : UserWorkspace[],
  ) { }
}

export class LoginViewModel {
  constructor(
    public EmailId: string,
    public Password: string,
    public Workspace: string
  ) { }
}

// export class User {
//   constructor(
//     // public id : number,
//     public email: string,
//     public token: string,
//     public workspace: string
//   ) { }
// }



export class WorkspaceName {
  constructor(
    // public id : number,
    // public  Id: number,
    public Name: string,

  ) { }
}

export class Channel {
  constructor(
    // public id : number,
    // public  Id: number,
    public ChannelName: string,
  ) { }
}
export class Userstate {
  constructor(
    // public id : number,
    // public  Id: number,
    public EmailId: string,
    public IsJoined : boolean,
    public Otp : string
  ) { }
}


export class TokenParams {
  constructor(
    // public id : number,
    public token: string,
    public expiration: string
  ) { }


}


