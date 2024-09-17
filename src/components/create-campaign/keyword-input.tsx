import React, { KeyboardEvent, useState, useRef } from "react";
import { FormControl, FormItem } from "@/components/ui/form";
import { X } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  setFormValue: (name: "linkedKeywords", value: string[]) => void;
  name: "linkedKeywords";
}

export function KeywordInput({
  keywords,
  setKeywords,
  setFormValue,
  name,
}: KeywordInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeywordInput = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const keyword = inputValue.trim();

      if (keyword && !keywords.includes(keyword)) {
        const newKeywords = [...keywords, keyword];
        setKeywords(newKeywords);
        setFormValue(name, newKeywords);
        setInputValue(""); // Clear the input field after adding the keyword
        textareaRef.current?.focus(); // Optional: Refocus the textarea
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const deleteKeyword = (keywordToDelete: string) => {
    const newKeywords = keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    setKeywords(newKeywords);
    setFormValue(name, newKeywords);
  };

  return (
    <FormItem>
      <FormControl>
        <Textarea
          ref={textareaRef}
          placeholder="Press Enter to add keywords"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeywordInput}
          rows={2}
        />
      </FormControl>
      <div className="flex flex-wrap gap-2 mt-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
          >
            {keyword}
            <X
              className="w-4 h-4 ml-2 cursor-pointer text-destructive hover:text-gray-700"
              onClick={() => deleteKeyword(keyword)}
            />
          </span>
        ))}
      </div>
    </FormItem>
  );
}
