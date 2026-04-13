
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAnimatedText } from '@/hooks/use-animated-text';
import { useIntegratedAi } from '@/hooks/use-integrated-ai';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Send, Paperclip } from 'lucide-react';

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const getImageKey = file => `${file.name}:${file.size}:${file.lastModified}`;

export default function IntegratedAiChat() {
	const { t } = useLanguage();
	const [input, setInput] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);
	const { messages, isStreaming, isLoadingHistory, sendMessage, clearMessages } = useIntegratedAi();
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	const imagePreviews = useMemo(() => selectedImages.map(file => ({
		key: getImageKey(file),
		file,
		url: URL.createObjectURL(file),
	})), [selectedImages]);

	useEffect(() => () => {
		imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
	}, [imagePreviews]);

	const lastMessage = messages[messages.length - 1];
	const isLastMessageStreaming = isStreaming && lastMessage?.role === 'assistant';
	const animatedText = useAnimatedText(isLastMessageStreaming ? lastMessage.content : '');

	useEffect(() => {
		const scrollToBottom = () => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}
		};

		scrollToBottom();
	}, [messages]);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();

		const trimmed = input.trim();

		if ((!trimmed && selectedImages.length === 0) || isStreaming) {
			return;
		}

		setInput('');
		sendMessage(trimmed, selectedImages);
		setSelectedImages([]);
	}, [input, selectedImages, isStreaming, sendMessage]);

	const handleImageSelect = useCallback((e) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter(file => VALID_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE);

		setSelectedImages((prev) => {
			const uniqueFilesMap = new Map(prev.map(file => [getImageKey(file), file]));
			validFiles.forEach(file => uniqueFilesMap.set(getImageKey(file), file));
			return Array.from(uniqueFilesMap.values()).slice(0, MAX_IMAGES);
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [fileInputRef]);

	const removeImage = useCallback((index) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	}, []);

	return (
		<div className="flex flex-col h-full bg-card">
			<div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30 shadow-inner">
						<span className="text-secondary font-bold text-sm">A2</span>
					</div>
					<div className="flex flex-col">
						<h2 className="font-bold text-[15px] leading-tight">{t.chat.artemisName}</h2>
						<span className="text-[12px] text-primary-foreground/80 leading-snug">{t.chat.artemisSubtitle}</span>
					</div>
				</div>
				{messages.length > 0 && (
					<button
						onClick={clearMessages}
						disabled={isStreaming}
						className="text-xs font-medium text-primary-foreground/70 hover:text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
					>
						Limpiar
					</button>
				)}
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-muted/30">
				{isLoadingHistory && (
					<div className="text-center text-sm text-muted-foreground py-4">Cargando historial...</div>
				)}
				
				{!isLoadingHistory && messages.length === 0 && (
					<div className="flex justify-start">
						<div className="max-w-[85%] rounded-2xl px-4 py-3 bg-card text-card-foreground rounded-tl-sm text-[14px] leading-relaxed shadow-sm border border-border/50">
							<p>{t.chat.artemisWelcomeMessage}</p>
						</div>
					</div>
				)}

				{messages.map((msg, i) => {
					const isLastStreamingMessage = isStreaming && i === messages.length - 1 && msg.role === 'assistant';
					const displayContent = isLastStreamingMessage ? animatedText : msg.content;

					return (
						<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
							<div
								className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
									msg.role === 'user'
										? 'bg-primary text-primary-foreground rounded-tr-sm'
										: 'bg-card text-card-foreground rounded-tl-sm border border-border/50'
								}`}
							>
								<p className="whitespace-pre-wrap">{displayContent}</p>
								{msg.images?.map((url, j) => (
									<img
										key={j}
										src={url}
										alt="AI generated"
										className="mt-2 rounded-xl max-w-full border border-border/50"
									/>
								))}
								{msg.role === 'assistant' && isStreaming && i === messages.length - 1 && !msg.content && (
									<span className="inline-flex space-x-1 mt-1">
										<span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
										<span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
										<span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
									</span>
								)}
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>

			<div className="p-3 border-t border-border bg-card">
				{selectedImages.length > 0 && (
					<div className="mb-3 flex gap-2 flex-wrap">
						{imagePreviews.map(({ key, file, url }, index) => (
							<div key={key} className="relative group">
								<img
									src={url}
									alt={file.name}
									className="w-16 h-16 object-cover rounded-lg border border-border"
								/>
								<button
									type="button"
									onClick={() => removeImage(index)}
									className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<form onSubmit={handleSubmit} className="flex items-end gap-2">
					<input
						ref={fileInputRef}
						type="file"
						accept={VALID_IMAGE_TYPES.join(',')}
						multiple
						onChange={handleImageSelect}
						className="hidden"
						disabled={isStreaming || isLoadingHistory}
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors disabled:opacity-50 shrink-0"
						disabled={isStreaming || isLoadingHistory || selectedImages.length >= MAX_IMAGES}
						title="Adjuntar imagen"
					>
						<Paperclip size={20} />
					</button>
					<div className="flex-1 relative">
						<textarea
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSubmit(e);
								}
							}}
							placeholder={t.chat.placeholder}
							className="w-full resize-none max-h-32 min-h-[44px] rounded-xl border border-border bg-background px-4 py-3 pr-12 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
							disabled={isStreaming || isLoadingHistory}
							rows={1}
						/>
						<button
							type="submit"
							disabled={isStreaming || (!input.trim() && selectedImages.length === 0)}
							className="absolute right-2 bottom-2 p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full disabled:opacity-50 transition-colors shadow-sm"
						>
							<Send size={16} className="translate-x-[1px] translate-y-[-1px]" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
