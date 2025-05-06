"use client";

import { useState, use, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForum } from "@/hooks/useForum";
import { Forum } from "@/types";
import {
  LoaderCircle,
  MessageSquareText,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useComment } from "@/hooks/useComment";
import AddComments from "@/pages/add-comments";

export default function ForumDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const { forums } = useForum();
  const { allComments, loading, deleteOneComment, getAllComments } =
    useComment();
  const forum: Forum | undefined = forums.find((f) => f.id === params.id);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showCommentInput, setShowCommentInput] = useState<
    Record<string, boolean>
  >({});

  const toggleCommentInput = (forumId: string) => {
    setShowCommentInput((prev) => ({ ...prev, [forumId]: !prev[forumId] }));
  };
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  useEffect(() => {
    getAllComments(params.id);
  }, [params.id]);

  if (!forum) return <div className="p-6 text-red-500">Forum not found</div>;
  return (
    <div className="p-2">
      <Card>
        <CardContent>
          <h1 className="font-medium text-lg pb-2">{forum.title}</h1>
          <p className="text-sm">{forum.description}</p>
          <div className="flex items-center pt-6 justify-between w-1/3">
            <div className="flex items-center gap-1 cursor-pointer">
              <ThumbsUp size={16} className="stroke-blue-500 fill-blue-500" />
              <small className="font-medium">Likes ({forum.likeCount})</small>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => toggleCommentInput(forum.id)}
            >
              <MessageSquareText size={16} className="mt-1" />
              <small className="font-medium">
                Comments ({forum.comments.length})
              </small>
            </div>
          </div>

          {/* Comments */}
          <AddComments
            forumId={forum.id}
            showCommentInput={showCommentInput}
            setShowCommentInput={setShowCommentInput}
          />
          <div className="pt-6">
            <h1 className="font-semibold mb-2">All Comments</h1>
            {allComments.slice(0, visibleCount).map((comment: any) => (
              <div
                key={comment.id}
                className="flex items-start gap-3 py-2 relative"
              >
                <img
                  src={`https://i.pravatar.cc/40`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between text-sm text-gray-700 font-medium">
                    <span className="flex items-center gap-2">
                      {comment.user.name}
                      <span className="text-gray-400 text-xs font-normal">
                        • {moment(comment.createdAt).fromNow()}
                      </span>
                    </span>
                    {comment.user.id === localStorage.getItem("userId") && (
                      <button
                        onClick={() => deleteOneComment(forum.id, comment.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        {loading ? (
                          <LoaderCircle size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="mt-1 inline-block border px-3 py-2 rounded-md text-sm text-gray-800">
                    {comment.content}
                  </div>
                </div>
              </div>
            ))}

            {visibleCount < forum.comments.length && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleLoadMore}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
