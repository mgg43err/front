export const validateUrl = (url: string): boolean => {
    try {
        // Декодируем URL и создаем объект URL для проверки
        const decodedUrl = decodeURIComponent(url);
        new URL(decodedUrl);

        // Проверяем на наличие потенциально опасных символов и последовательностей
        const dangerousPatterns = [
            '<script',
            'javascript:',
            'data:',
            'vbscript:',
            'onclick',
            'onerror',
            'onload',
            'eval(',
            'alert(',
        ];

        const lowerUrl = decodedUrl.toLowerCase();
        const hasScriptInjection = dangerousPatterns.some((pattern) => lowerUrl.includes(pattern));

        if (hasScriptInjection) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};
