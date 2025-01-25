/* eslint-disable @typescript-eslint/no-explicit-any */
import { IExpense } from "../../entities/expenseEntities";
import IGroup from "../../entities/groupEntities";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<any>;
  createUser(userData: any): Promise<any>;
  updateUser(userData: any, email: string): Promise<any>;
  findUserByRefreshToken(refreshToken: string): Promise<any>;
  updateRefreshToken(refreshToken: string, email: string): Promise<any>;
  findUserByPhoneNumber(phoneNumber: string): Promise<any>;
  removeRefreshToken(email: string): Promise<any>;
  findExpensesByUserId(userId: string): Promise<IExpense[]>;
  createExpense(expenseData: IExpense): Promise<IExpense>;
  createGroup(groupData: IGroup):Promise<IGroup>
  getUserGroups(email:string):Promise<IGroup[]>
}
