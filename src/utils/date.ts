export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleTimeString('ru-RU', {month: 'long', hour: 'numeric', minute: 'numeric'})
}