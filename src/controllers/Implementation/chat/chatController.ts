import { inject, injectable } from "tsyringe";
import { IChatController } from "../../Interface/chat/IChatController";
import cloudinary from "../../../config/cloudinaryConfig";
import { IChatService } from "../../../services/Interface/chat/IChatService";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { Request, Response } from "express";

@injectable()
export default class ChatController implements IChatController{
    private chatService: IChatService

    constructor(@inject('IChatService')chatService:IChatService){
        this.chatService = chatService
    }


    async sendMessage(req: Request, res: Response): Promise<Response> {
      try {
        const { sender, receiver, text } = req.body;
  
        if (!sender || !receiver || !text) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "All fields are required" });
        }
  
        const message = await this.chatService.sendMessage({ sender, receiver, text } as any);
        return res.status(HttpStatusCode.CREATED).json(message);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    }


    async fetchMessages(req: Request, res: Response): Promise<Response> {
      try {
        console.log("fetchMesg-controll : +++++++++++++ ",req.params)
        const { senderId, receiverId } = req.params;
  
        if (!senderId || !receiverId) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Sender and receiver IDs are required" });
        }
  
        const messages = await this.chatService.fetchMessages(senderId, receiverId);
        console.log("messages-contrll : ",messages)
        return res.status(HttpStatusCode.OK).json(messages);
      } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
      }
    }

    async fetchUsers(req: Request, res: Response): Promise<Response> {
      try{
        const {id} = req.params
        const users = await this.chatService.fetchUsers(id)
        console.log("users :",users)
        return res.status(HttpStatusCode.OK).json({users})
      }catch(err){
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
      }
    }

    async fetchAdvisors(req: Request, res: Response): Promise<Response> {
      try{
        const {id} = req.params
        const users = await this.chatService.fetchAdvisors(id)
        console.log("Advisors :",users)
        return res.status(HttpStatusCode.OK).json({users})
      }catch(err){
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
      }
    }


    async createChat(req: Request, res: Response):Promise<Response> {
      try {
        const chat = await this.chatService.createChat(req.body);
        return res.status(201).json({ success: true, result: chat });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating chat", error });
      }
    }
  
    async fetchChats(req: Request, res: Response):Promise<Response> {
      try {
        const userId = req.params.userId;
        const chats = await this.chatService.getUserChats(userId);
        return res.status(200).json({ success: true, result: chats });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching chats", error });
      }
    }
  
    async fetchAllChats(req: Request, res: Response):Promise<Response> {
      try {
        const chats = await this.chatService.getAllChats();
        return res.status(200).json({ success: true, result: chats });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching all chats", error });
      }
    }


    // async findMyFriends(req:Request,res:Response):Promise<void>{
    //     try{
    //       const {id}=req.params
    //       const list = await this.chatService.findLists(id)
    //       if(list==null){
    //        res.status(HttpStatusCode.NO_CONTENT).json({message:'Your friend list is empty'})
    //       }
    //        res.status(HttpStatusCode.OK).json({list})
      
    //     }catch(err){
    //        res.status(500).json({ error: "internal server error" }); 
    //     }
    //   }
      
      // async getMessage(req:Request,res:Response):Promise<void>{
      //   try{
      //     const {id}=req.params
      //     const messages= await this.chatService.getMessages(id)
      //     if(messages==null){
      //        res.status(HttpStatusCode.BAD_REQUEST).json({error:'Something went wrong'})
      //     }
      //     res.status(HttpStatusCode.OK).json({messages})
      //   }catch(err:any){
      //     if (err.message.startsWith("Invalid  ID")) {      
      //        res.status(HttpStatusCode.BAD_REQUEST).json({ message: err.message });
      //     }
      //      res.status(500).json({ error: "internal server error" }); 
      //   }
      // }
    
      // async postImage(req: Request, res: Response): Promise<void> {
      //   try {
      //     const file = req.file;
      //     if (!file) {
      //       res.status(400).json({ error: 'No file uploaded' });
      //       return
      //     }
      //     const result = await cloudinary.uploader.upload(file.path, {
      //       folder: 'profile_pictures',
      //     });
      //     // console.log("result : ", result)
      //     const imageUrl = result.secure_url;
      //     // console.log("imageUrl : ", imageUrl)
      //     res.status(200).json({ url: imageUrl });
      //   } catch (error) {
      //     console.error('Error uploading image:', error);
      //     res.status(500).json({ error: 'Error uploading image' });
      //   }
      // }

}