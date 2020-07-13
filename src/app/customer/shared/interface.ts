
export interface IAdmins {
    id: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    role: string;
    color: string[];
    status: number;
    country: string;
}
export interface ISelect {
    id?: string;
    name?: string;
}

export interface Financial {
	Id?: number;
	Name?: string;
	NepaliEndDate?: string;	
	NepaliStartDate?: string;
    StartDate?: string;
    EndDate?: string;
}

export interface Company {
	Id?: number;
    BranchCode?: string;
    Address?: string;
    City?: string;
    Street?: string;
    District?: string;
	Email?: string;	
	File?: string;
	IdentityFileName?: string;
	IdentityFileType?: string;	
	PhotoIdentity?: string;
	IRD_Password?: string;
	IRD_UserName?: string;
	NameEnglish?: string;
	NameNepali?: string;
	Pan_Vat?: string;
	Phone?: string;
}