import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function Delete() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-origin text-white "  variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogDescription>
            Are you sure you  
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <DialogClose asChild>
        <Button className="bg-red-origin text-white " >Delete</Button>
          </DialogClose>

        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
