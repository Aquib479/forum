"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForum } from "@/hooks/useForum";
import { MessageSquareText, ThumbsUp } from "lucide-react";
import Link from "next/link";
import AddComments from "./add-comments";
import moment from "moment";

function Forums() {
  const { filteredForums, likeForum } = useForum();
  const [showCommentInput, setShowCommentInput] = useState<
    Record<string, boolean>
  >({});
  const toggleCommentInput = (forumId: string) => {
    setShowCommentInput((prev) => ({ ...prev, [forumId]: !prev[forumId] }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {filteredForums.map((forum: any) => (
          <Card key={forum.id} className="cursor-pointer py-4">
            <CardContent>
              <Link href={`/forum/${forum.id}`}>
                <h1 className="font-medium text-lg pb-2">{forum.title}</h1>
                <p className="test-sm">{forum.description}</p>
                <div className="flex items-center justify-between">
                  <small className="text-slate-400 italic">
                    Posted By: {forum.author.name}
                  </small>
                  <small className="text-slate-400 italic">
                    {moment(forum.createdAt).fromNow()}
                  </small>
                </div>
              </Link>
              <hr className="mt-4" />
              <div className="flex items-center pt-2 justify-between">
                <div className="flex items-center gap-1 cursor-pointer">
                  <ThumbsUp
                    size={16}
                    className={`${
                      forum.likedUserIds.includes(
                        localStorage.getItem("userId")
                      )
                        ? "stroke-blue-500 fill-blue-500"
                        : ""
                    }`}
                    onClick={() => likeForum(forum.id)}
                  />
                  <small className="font-medium">
                    Likes ({forum.likeCount})
                  </small>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleCommentInput(forum.id)}
                >
                  <MessageSquareText size={16} className="mt-1" />
                  <small className="font-medium">
                    comments (
                    {forum.comments.length > 0 ? forum.comments.length : 0})
                  </small>
                </div>
              </div>

              <AddComments
                forumId={forum.id}
                showCommentInput={showCommentInput}
                setShowCommentInput={setShowCommentInput}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Forums;
