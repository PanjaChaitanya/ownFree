'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Upload, X, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileToBase64 } from '@/utils/helpers';

export default function ImageUpload({ value, publicId, onChange, folder = 'horizon-web-labs', label = 'Image', aspect = '16:9' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error('Image must be under 10MB'); return; }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, folder, publicId }),
      });
      const json = await res.json();
      if (json.success) {
        onChange({ url: json.data.url, publicId: json.data.publicId });
        toast.success('Image uploaded!');
      } else {
        toast.error(json.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (!publicId) { onChange({ url: '', publicId: '' }); return; }
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });
    } catch {}
    onChange({ url: '', publicId: '' });
  };

  return (
    <div>
      <p className="text-sm font-medium text-slate-300 mb-2">{label}</p>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <div className={`relative w-full ${aspect === '1:1' ? 'h-40' : 'h-48'}`}>
            <Image src={value} alt={label} fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-white/15 rounded-xl h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-200"
        >
          {uploading ? (
            <Loader className="w-6 h-6 text-violet-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-slate-400" />
              <p className="text-slate-400 text-sm">Click to upload</p>
              <p className="text-slate-600 text-xs">PNG, JPG, WebP up to 10MB</p>
            </>
          )}
        </motion.div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
