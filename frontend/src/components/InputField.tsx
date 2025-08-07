import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface InputFieldProps {
  onSubmit: (text: string, file?: File | null) => void;
  disabled?: boolean;
}

export function InputField({ onSubmit, disabled = false }: InputFieldProps) {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    if (inputText.trim() || file) {
      onSubmit(inputText, file);
      // 重置表单
      setInputText('');
      setFile(null);
    }
  };
  
  const handleFileButtonClick = () => {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  };
  
  return (
    <div className="input-wrapper">
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleTextChange}
          className="meme-input"
          placeholder="输入文字、上传图片或粘贴视频链接..."
          disabled={disabled}
        />
        {/* Hidden file input */}
        <input 
          type="file" 
          id="file-upload" 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
          disabled={disabled}
        />
        <button 
          className="upload-button"
          onClick={handleFileButtonClick}
          disabled={disabled}
          title="上传图片"
        >
          📷
        </button>
        <button 
          className="go-button" 
          onClick={handleSubmit}
          disabled={disabled}
        >
          {disabled ? '处理中...' : 'Go'}
        </button>
      </div>
      
      {file && (
        <div className="selected-file">
          <span>已选择: {file.name}</span>
          <button 
            className="remove-file" 
            onClick={() => setFile(null)}
            disabled={disabled}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
