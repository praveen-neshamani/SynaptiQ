'use client'

import { useEffect, useRef } from 'react'
import { CourseVideo } from '@/lib/courseData'

interface Props {
  playlist: CourseVideo[]
  currentIndex: number
  newlyInsertedId: string | null
}

export default function KnowledgeGraph({ playlist, currentIndex, newlyInsertedId }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const currentVideo = playlist[currentIndex]

  const getGraphUrl = () => {
    if (!currentVideo) return '/knowledge-graphs/bfs-initial.html'

    const videoId = currentVideo.id
    
    const hasFundamental = playlist.some(v => 
      v.isFundamental && v.insertedAfter === videoId
    )

    const graphMap: Record<string, { initial: string; withFundamental: string }> = {
      'bfs': {
        initial: '/knowledge-graphs/bfs-initial.html',
        withFundamental: '/knowledge-graphs/bfs-with-queue.html'
      },
      'dfs': {
        initial: '/knowledge-graphs/dfs-initial.html',
        withFundamental: '/knowledge-graphs/dfs-with-stack.html'
      },
      'bst': {
        initial: '/knowledge-graphs/bst-initial.html',
        withFundamental: '/knowledge-graphs/bst-with-tree.html'
      }
    }

    const graph = graphMap[videoId]
    if (!graph) return '/knowledge-graphs/bfs-initial.html'

    return hasFundamental ? graph.withFundamental : graph.initial
  }

  const graphUrl = getGraphUrl()

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = graphUrl
    }
  }, [graphUrl, newlyInsertedId])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F5F5F0',
      overflow: 'hidden',
      padding: '20px', // Added padding to ensure the graph respects the outer box borders
      boxSizing: 'border-box', // Ensures padding doesn't push the container past 100%
    }}>
      <iframe
        ref={iframeRef}
        src={graphUrl}
        style={{
          width: '100%', // Changed from fixed 400px
          height: '100%', // Changed from fixed 300px
          border: 'none',
          display: 'block',
          borderRadius: '8px',
          // Removed transform: scale(0.95) to prevent any unnatural clipping
        }}
        title="Knowledge Graph"
      />
    </div>
  )
}