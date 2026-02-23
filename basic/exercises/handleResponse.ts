type Status = "success" | "error" | "loading";

function handleResponse(status: Status): void{
    if(status === "success") console.log("Done!")
   else if(status === "error") console.log("An error occured!!")
    
}
handleResponse("success")