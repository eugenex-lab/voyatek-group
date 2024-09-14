import { KeyboardEvent } from "react";
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
  const handleKeywordInput = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = event.target as HTMLTextAreaElement;
      const keyword = input.value.trim();

      if (keyword && !keywords.includes(keyword)) {
        const newKeywords = [...keywords, keyword];
        setKeywords(newKeywords);
        setFormValue(name, newKeywords);
        input.value = "";
      }
    }
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
          className=""
          placeholder="Press Enter to add keywords"
          onKeyPress={handleKeywordInput}
        />
      </FormControl>
      <div className="mt-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 mb-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-full"
          >
            {keyword}
            <X
              className="w-4 h-4 ml-2 cursor-pointer text-des hover:text-gray-700 text-destructive"
              onClick={() => deleteKeyword(keyword)}
            />
          </span>
        ))}
      </div>
    </FormItem>
  );
}
