"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  FileQuestion,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Clock,
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Quiz, QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { submitQuizAction } from "@/app/learn/[courseSlug]/actions";
import { toast } from "sonner";

interface QuizRunnerProps {
  quiz: Quiz;
  courseSlug: string;
  courseTitle: string;
}

export function QuizRunner({ quiz, courseSlug, courseTitle }: QuizRunnerProps) {
  const router = useRouter();
  const questions = quiz.questions || [];

  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<{
    scorePercentage: number;
    isPassed: boolean;
    certificateCode: string | null;
    feedback: { questionId: string; correct: boolean; explanation?: string }[];
  } | null>(null);

  const currentQ = questions[currentQuestionIndex];
  const allAnswered = questions.every((q) => Boolean(selectedAnswers[q.id]));

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await submitQuizAction(quiz.id, quiz.course_id, selectedAnswers);
      if (res.success && res.scorePercentage !== undefined) {
        setResult({
          scorePercentage: res.scorePercentage,
          isPassed: Boolean(res.isPassed),
          certificateCode: res.certificateCode || null,
          feedback: res.feedback || [],
        });

        if (res.isPassed) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
          toast.success(`Congratulations! You passed with a score of ${res.scorePercentage}%!`);
        } else {
          toast.error(`Score: ${res.scorePercentage}%. Passing grade is ${quiz.passing_score}%.`);
        }
      } else {
        toast.error(res.error || "Failed to submit assessment.");
      }
    } catch {
      toast.error("Submission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-8 animate-in fade-in duration-300">
        <div className={`rounded-3xl border p-8 md:p-12 text-center space-y-6 shadow-xl ${
          result.isPassed
            ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
            : "border-destructive/30 bg-destructive/5 text-foreground"
        }`}>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-background shadow-md">
            {result.isPassed ? (
              <Award className="h-10 w-10 text-emerald-500" />
            ) : (
              <XCircle className="h-10 w-10 text-destructive" />
            )}
          </div>

          <div className="space-y-2">
            <Badge variant={result.isPassed ? "success" : "destructive"} className="text-xs">
              {result.isPassed ? "Assessment Passed" : "Assessment Not Passed"}
            </Badge>
            <h1 className="font-heading text-4xl font-extrabold">
              {result.scorePercentage}%
            </h1>
            <p className="text-sm text-muted-foreground">
              Passing threshold: {quiz.passing_score}% • Questions answered: {questions.length}
            </p>
          </div>

          {result.isPassed && result.certificateCode && (
            <div className="rounded-2xl border border-emerald-500/30 bg-card p-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                <Sparkles className="h-4 w-4" />
                Verified Certificate Unlocked!
              </div>
              <p className="text-xs text-muted-foreground">
                Your official verified certificate is ready to print, download, and share.
              </p>
              <Link href={`/certificates/${result.certificateCode}`} target="_blank">
                <Button variant="default" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  View Official Certificate →
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link href={`/learn/${courseSlug}`}>
              <Button variant="outline" className="rounded-xl">
                Return to Course
              </Button>
            </Link>
            {!result.isPassed && (
              <Button variant="default" onClick={handleReset} className="rounded-xl">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Exam
              </Button>
            )}
          </div>
        </div>

        {/* Itemized Feedback */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Assessment Item Review
          </h3>
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const fb = result.feedback.find((f) => f.questionId === q.id);
              return (
                <div key={q.id} className="rounded-xl border border-border bg-card p-5 space-y-2">
                  <div className="flex items-start gap-3">
                    {fb?.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {idx + 1}. {q.question_text}
                      </p>
                      {fb?.explanation && (
                        <p className="text-xs text-muted-foreground mt-2 bg-muted/40 p-2.5 rounded-lg">
                          <span className="font-semibold text-foreground">Explanation:</span> {fb.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Quiz Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link href={`/learn/${courseSlug}`} className="hover:underline">
              ← Back to {courseTitle}
            </Link>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            {quiz.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Question {currentQuestionIndex + 1} of {questions.length} • Passing Score: {quiz.passing_score}%
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            {Object.keys(selectedAnswers).length}/{questions.length} Answered
          </Badge>
        </div>
      </div>

      {/* Active Question Box */}
      {currentQ && (
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Question {currentQuestionIndex + 1}
            </span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-snug">
              {currentQ.question_text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options?.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${
                    isSelected
                      ? "border-brand-600 bg-brand-500/10 text-foreground font-semibold ring-1 ring-brand-600"
                      : "border-border bg-card hover:bg-muted/40 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                        isSelected
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-muted-foreground/40 text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <span>{opt.option_text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Nav Controls */}
          <div className="flex items-center justify-between border-t border-border/80 pt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="rounded-xl"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="rounded-xl"
                >
                  Next Question
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  size="sm"
                  disabled={!allAnswered || submitting}
                  onClick={handleSubmit}
                  className="rounded-xl px-6"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Evaluating Answers...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Submit Final Exam
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
