"use client";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMemberForm from "@/components/dashboard/member/AddMemberForm";
import { DataTable } from "@/components/common/DataTable";

import { AnimatedLoader } from "@/components/common/Loader";
import { memberColumns } from "@/config/columns/memberColumn";
import { useMembers } from "@/services/queries";

export default function MembersPage() {
  const { data: members, error, isLoading } = useMembers();

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">Error loading members data.</p>
      </div>
    );
  }

  if (isLoading) {
    return <AnimatedLoader size={30} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Members</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new member.
              </DialogDescription>
            </DialogHeader>
            <AddMemberForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={memberColumns}
          data={members || []}
          searchKey="name"
          searchPlaceholder="Search members..."
        />
      </div>
    </div>
  );
}
