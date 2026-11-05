import { apiClient } from '@/lib/api-client'

export interface HealthResponse {
  status: string
}

export const getHealth = () => apiClient<HealthResponse>('/health')
