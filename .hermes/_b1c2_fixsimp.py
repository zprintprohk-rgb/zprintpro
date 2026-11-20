# -*- coding: utf-8 -*-
import io
p = r'F:\zprintpro-nextjs\.hermes\_b1c2_patch.py'
lines = io.open(p, encoding='utf-8').read().split('\n')
assert lines[10].startswith('SIMP = set('), lines[10][:40]
new = "SIMP = set('线发务动优仅们风飞历压县参双变叶吗听启员呛响哑哒团围图圣场坏块坚坝备复够奋奖妇娱孙宁实宠审宫宽寻导尝层屿岁岚岛岭币帅带并庆库庙废弯弹归彻径忧怀恳恼悬惊惯愤愿戏战户扩扫扬扰抚抛抢护报拥拦拨择挂挠挡挣挤挥损换捣掷摆摇摊显晓暂机杀杂权构枪标栏树桥欢毙气沟沦泪泼浆测济浓涂润涨渐渔滚滤灭灾炼烂烦烧热牵献犹独狮猎环现疗疮疯皱盐盘祷祸离积稳穷窝窥竞笔签紧红级纯纲纵纸练组细织终经结绘绝绣续绳维绵绿缓编缩缴网罗羡翘职聪肃肾肿脏腊腾云价众优伙传伤伦伫买乱争艺')"
lines[10] = new
io.open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
print('line 11 replaced, len:', len(new))
