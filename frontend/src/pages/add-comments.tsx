import { Input } from "@/components/ui/input";
import { useComment } from "@/hooks/useComment";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface addCommentProps {
  forumId: any;
  showCommentInput: Record<number, boolean>;
  setShowCommentInput: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
}

export default function AddComments({
  forumId,
  showCommentInput,
  setShowCommentInput,
}: addCommentProps) {
  const { loading, addNewComment } = useComment();
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (forumId: string) => {
    const data = {
      content: newComment,
    };
    if (newComment.trim()) {
      addNewComment(forumId, data);
      setNewComment("");
      setShowCommentInput((prev) => ({ ...prev, [forumId]: false }));
    }
  };

  const handleCancel = (forumId: string) => {
    setNewComment("");
    setShowCommentInput((prev) => ({ ...prev, [forumId]: false }));
  };
  return (
    <>
      {showCommentInput[forumId] && (
        <div className="mt-4">
          <Input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleAddComment(forumId)}
              className="bg-blue-500 text-white p-2 rounded-md w-full text-sm"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                "Post Comment"
              )}
            </button>
            <button
              onClick={() => handleCancel(forumId)}
              className="bg-gray-300 text-black p-2 rounded-md w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
