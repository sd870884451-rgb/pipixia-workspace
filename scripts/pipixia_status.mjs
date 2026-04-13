/**
 * 皮皮虾大别墅状态同步脚本
 * 作用：把我当前的工作状态写入 ClawLibrary，让像素猫跑到对应的房间
 * 
 * 用法：
 *   node scripts/pipixia_status.mjs --zone skills --detail "正在安装技能包"
 *   node scripts/pipixia_status.mjs --zone mcp --detail "正在写代码"
 *   node scripts/pipixia_status.mjs --zone memory --detail "正在整理记忆"
 *   node scripts/pipixia_status.mjs --zone document --detail "正在写作"
 *   node scripts/pipixia_status.mjs --done  (回到休息室)
 * 
 * zone 选项：skills | mcp | memory | document | images | schedule | gateway | alarm | break_room
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readFileSync as rf } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OPENCLAW_ROOT = join(ROOT, '..', '..', '.openclaw');
const TASKS_DIR = join(OPENCLAW_ROOT, 'tasks');
const TASK_QUEUE_PATH = join(TASKS_DIR, 'task-queue.json');
const BACKUP_PATH = join(TASKS_DIR, 'task-queue.json.bak');

// 从命令行参数解析
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, ...rest] = arg.slice(2).split('=');
    acc[key] = rest.join('=') || true;
  } else if (arg.startsWith('-')) {
    acc[arg.slice(1)] = true;
  }
  return acc;
}, {});

// Zone → ClawLibrary resourceId 映射
const ZONE_MAP = {
  skills: 'skills',
  mcp: 'mcp',
  code: 'mcp',
  memory: 'memory',
  document: 'document',
  images: 'images',
  schedule: 'schedule',
  gateway: 'gateway',
  alarm: 'alarm',
  break_room: 'break_room',
  idle: 'break_room',
};

// 备用房间（zone 不认识时）
const FALLBACK_ZONE = 'mcp';

function getZone() {
  const z = args.zone || args.z;
  if (!z) return null;
  return ZONE_MAP[z.toLowerCase()] || z;
}

function getDetail() {
  return args.detail || args.d || '';
}

function now() {
  return new Date().toISOString();
}

// 读取现有 task-queue（如果有）
function loadQueue() {
  if (!existsSync(TASK_QUEUE_PATH)) return null;
  try {
    return JSON.parse(readFileSync(TASK_QUEUE_PATH, 'utf8'));
  } catch {
    return null;
  }
}

// 保存备份
function backup() {
  if (existsSync(TASK_QUEUE_PATH)) {
    mkdirSync(TASKS_DIR, { recursive: true });
    writeFileSync(BACKUP_PATH, readFileSync(TASK_QUEUE_PATH, 'utf8'), 'utf8');
    console.log('📦 备份已保存到', BACKUP_PATH);
  }
}

// 判断任务是否已经存在
function findMyTask(queue) {
  if (!queue || !Array.isArray(queue)) return null;
  return queue.find(t => t.source === 'pipixia-mansion-status');
}

// 构建皮皮虾专属任务
function buildTask(zone, detail, done = false) {
  const ZONE_LABELS = {
    skills: '技能锻炉',
    mcp: '代码实验室',
    memory: '记忆库',
    document: '文档归档',
    images: '图像工坊',
    schedule: '调度台',
    gateway: '界面网关',
    alarm: '报警中心',
    break_room: '休息室'
  };
  const zoneLabel = ZONE_LABELS[zone] || zone;

  return {
    id: 'pipixia-status-task',
    source: 'pipixia-mansion-status',
    status: done ? 'pending' : 'running',
    createdAt: now(),
    updatedAt: now(),
    // resourceId 是关键！ClawLibrary 靠它决定像素猫跑到哪个房间
    resourceId: zone,
    goal: done ? '任务完成，回到休息室' : `皮皮虾正在 ${zoneLabel}`,
    description: detail || `正在 ${zoneLabel} 中工作`,
    detail: detail,
    metadata: {
      zone,
      zoneLabel,
      done,
      actor: 'pipixia'
    }
  };
}

// 主逻辑
const zone = getZone();
const detail = getDetail();
const done = args.done || args.clear || args.idle;

// 备份
backup();

let queue = loadQueue() || [];

// 移除旧的皮皮虾任务
queue = queue.filter(t => t.source !== 'pipixia-mansion-status');

// 如果不是 done，添加新任务
if (!done && zone) {
  const task = buildTask(zone, detail);
  queue.unshift(task); // 插入到最前面
  console.log(`✅ 状态已更新：`);
  console.log(`   房间：${zone}`);
  console.log(`   状态：${done ? '休息中' : '工作中'}`);
  console.log(`   详情：${detail || '(无)'}`);
} else if (done) {
  console.log('✅ 已回到休息室');
}

// 写回
mkdirSync(TASKS_DIR, { recursive: true });
writeFileSync(TASK_QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf8');
console.log(`📝 已写入 ${TASK_QUEUE_PATH}`);
