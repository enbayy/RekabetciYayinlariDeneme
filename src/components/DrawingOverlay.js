'use client';

import { useEffect, useRef } from 'react';

export default function DrawingOverlay({
  enabled,
  active,
  tool,
  color,
  size,
  currentQuestion,
  drawingsMap,
  setDrawingsMap,
  children
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const dprRef = useRef(1);
  const isPointerDownRef = useRef(false);
  const currentPathRef = useRef(null);

  function getCtx() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    return ctx;
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    dprRef.current = dpr;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = getCtx();
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    redrawAll();
  }

  function drawPath(ctx, path) {
    if (!path || !path.points || path.points.length === 0) return;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = path.size;
    if (path.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = path.color;
    }
    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);
    for (let i = 1; i < path.points.length; i++) {
      const pt = path.points[i];
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function redrawAll() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width / dprRef.current, canvas.height / dprRef.current);
    const paths = drawingsMap[currentQuestion] || [];
    for (let i = 0; i < paths.length; i++) {
      drawPath(ctx, paths[i]);
    }
  }

  function getRelativePos(evt) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  function handlePointerDown(e) {
    if (!enabled || !active) return;
    e.preventDefault();
    const pos = getRelativePos(e);
    currentPathRef.current = {
      tool,
      color,
      size,
      points: [pos]
    };
    isPointerDownRef.current = true;
  }

  function handlePointerMove(e) {
    if (!isPointerDownRef.current || !currentPathRef.current) return;
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getRelativePos(e);
    const path = currentPathRef.current;
    path.points.push(pos);
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = path.size;
    if (path.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = path.color;
    }
    const len = path.points.length;
    if (len >= 2) {
      const p1 = path.points[len - 2];
      const p2 = path.points[len - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function handlePointerUp(e) {
    if (!isPointerDownRef.current || !currentPathRef.current) return;
    e.preventDefault();
    const finishedPath = currentPathRef.current;
    currentPathRef.current = null;
    isPointerDownRef.current = false;
    setDrawingsMap(prev => {
      const prevPaths = prev[currentQuestion] || [];
      return { ...prev, [currentQuestion]: [...prevPaths, finishedPath] };
    });
  }

  function handlePointerCancel(e) {
    if (!isPointerDownRef.current) return;
    e.preventDefault();
    currentPathRef.current = null;
    isPointerDownRef.current = false;
  }

  useEffect(() => {
    if (!enabled) return;
    const ro = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) ro.observe(containerRef.current);
    const raf = requestAnimationFrame(() => resizeCanvas());
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [enabled, currentQuestion]);

  useEffect(() => {
    if (!enabled) return;
    redrawAll();
  }, [drawingsMap, tool, color, size, currentQuestion, enabled]);

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
      {enabled && (
        <canvas
          ref={canvasRef}
          className={`${active ? 'cursor-crosshair' : 'pointer-events-none'} absolute inset-0 w-full h-full z-10`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerCancel}
          onPointerCancel={handlePointerCancel}
        />
      )}
    </div>
  );
}


