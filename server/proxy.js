import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const N8N_URL = 'http://192.168.10.20:5678/webhook/legal-ai-webhook/chat'

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Proxy: /api/chat called')
    console.log('Proxy: incoming body', req.body)

    const n8nPayload = { chatInput: req.body.message ?? req.body.query ?? req.body.input ?? req.body.text }

    const response = await axios.post(N8N_URL, n8nPayload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
     // timeout: 30000,
    })

    const transformed = {
      reply: response.data.output || response.data.response || response.data.reply || response.data.answer || response.data || 'No response from AI',
      raw: response.data,
    }

    res.json(transformed)
  } catch (err) {
    console.error('Proxy error:', err?.message || err)
    const code = err?.code || 'UNKNOWN_ERROR'
    const status = err?.response?.status || 500
    res.status(status).json({ error: 'Proxy failed', details: err?.message, code })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Proxy listening on http://localhost:${port}`))
