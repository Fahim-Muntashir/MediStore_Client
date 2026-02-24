"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { leaveReview } from "@/actions/order.actions";

interface LeaveReviewProps {
  orderId: string;
  medicineId: string;
}

export const LeaveReview: React.FC<LeaveReviewProps> = ({
  orderId,
  medicineId,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }

    setLoading(true);
    try {
      const res = await leaveReview(orderId, {
        medicineId,
        rating,
        comment,
      });

      console.log(res);
      if (res.error) {
        toast.error(res.error.message || "Failed to submit review");
      } else {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <span>Rating:</span>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </div>

      <Textarea
        placeholder="Leave a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full"
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};
